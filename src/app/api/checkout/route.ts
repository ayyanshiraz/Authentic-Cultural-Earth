import { NextResponse } from "next/server";
import prisma from "../../../lib/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { 
      firstName, lastName, customerEmail, customerPhone, 
      address1, address2, city, state, zip, country, 
      totalAmount, items 
    } = body;

    const newOrder = await prisma.order.create({
      data: {
        firstName, lastName, customerEmail, customerPhone,
        address1, address2: address2 || null, city, state, zip, country,
        totalAmount: parseFloat(totalAmount),
        items: {
          create: items.map((item: any) => ({
            productId: item.productId || item.id,
            quantity: item.quantity,
            price: parseFloat(item.price)
          }))
        }
      }
    });

    await resend.emails.send({
      from: `onboarding@resend.dev`,
      to: `alishbazia.blackzero@gmail.com`,
      subject: `Order Confirmation - Authentic Cultural Earth`,
      html: `
        <div style=background-color:#050505;padding:40px;font-family:sans-serif;text-align:center;color:#ffffff;>
          <div style=max-width:500px;margin-left:auto;margin-right:auto;background-color:#111111;border-radius:24px;overflow:hidden;padding-bottom:40px;border-width:1px;border-style:solid;border-color:#333333;>
            <img src=https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&amp;fit=crop&amp;q=80&amp;w=600 style=width:100%;height:auto; alt=Cover />
            
            <h2 style=letter-spacing:4px;font-weight:400;margin-top:40px;>AUTHENTIC CULTURAL EARTH</h2>
            
            <div style=background-color:#1a1a1a;margin-top:30px;margin-bottom:30px;padding-top:30px;padding-bottom:30px;padding-left:20px;padding-right:20px;>
              <h3 style=font-weight:400;margin-bottom:10px;>Thank you, ${newOrder.firstName}</h3>
              <p style=color:#aaaaaa;font-size:14px;line-height:1.6;>Your cultural packs are being prepared for dispatch.</p>
              <p style=font-size:24px;font-weight:600;margin-top:20px;>$${newOrder.totalAmount} USD</p>
            </div>
            
            <p style=color:#666666;font-size:12px;margin-bottom:5px;>ORDER IDENTIFIER</p>
            <p style=color:#aaaaaa;font-size:12px;letter-spacing:1px;>${newOrder.id}</p>
          </div>
        </div>
      `
    });

    await resend.emails.send({
      from: `onboarding@resend.dev`,
      to: `alishbazia.blackzero@gmail.com`,
      subject: `New Order Received - ${newOrder.id}`,
      html: `
        <div>
          <h2>You have a new order!</h2>
          <p><strong>Order ID:</strong> ${newOrder.id}</p>
          
          <h3>Customer Details</h3>
          <p><strong>Name:</strong> ${newOrder.firstName} ${newOrder.lastName}</p>
          <p><strong>Email:</strong> ${newOrder.customerEmail}</p>
          <p><strong>Phone:</strong> ${newOrder.customerPhone}</p>
          
          <h3>Shipping Destination</h3>
          <p>
            ${newOrder.address1}<br/>
            ${newOrder.address2 ? newOrder.address2 + `<br/>` : ``}
            ${newOrder.city}, ${newOrder.state} ${newOrder.zip}<br/>
            ${newOrder.country}
          </p>

          <h3>Total Value: $${newOrder.totalAmount} USD</h3>
        </div>
      `
    });

    return NextResponse.json({ success: true, orderId: newOrder.id });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: `Checkout failed` }, { status: 500 });
  }
}