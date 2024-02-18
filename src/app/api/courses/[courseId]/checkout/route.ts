import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });

    const alreadyPurchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        },
      },
    });

    if (alreadyPurchase) {
      return new NextResponse("Already Purchased", { status: 400 });
    }

    if (!course) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: course.title,
            description: course.description!,
          },
          unit_amount: Math.round(course.price! * 100),
        },
      },
    ];

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses![0].emailAddress,
      });
      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        },
      });
    }

    const isProduction = process.env.NODE_ENV === "production";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer: stripeCustomer.stripeCustomerId,
      success_url: `${
        isProduction
          ? process.env.NEXT_PUBLIC_PRODUCTION_APP_URL
          : process.env.NEXT_PUBLIC_APP_URL
      }/courses/${course.id}?success=1`,
      cancel_url: `${
        isProduction
          ? process.env.NEXT_PUBLIC_PRODUCTION_APP_URL
          : process.env.NEXT_PUBLIC_APP_URL
      }/courses/${course.id}`,
      metadata: {
        courseId: course.id,
        userId: user.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("courseidcheckout", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
