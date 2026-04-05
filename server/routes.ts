import type { Express } from "express";
import type { Server } from "http";
import { execSync } from "child_process";
import { storage } from "./storage";
import { insertOrderSchema } from "@shared/schema";
import type { Order } from "@shared/schema";

function sendOrderNotification(order: Order) {
  try {
    const body = [
      `NEW ORDER #${order.id} - Pacific Tote Co.`,
      ``,
      `Customer: ${order.fullName}`,
      `Phone: ${order.phone}`,
      `Email: ${order.email}`,
      ``,
      `Package: ${order.packageName}`,
      `Totes: ${order.toteCount}${order.extraTotes ? ` + ${order.extraTotes} extra` : ''}`,
      `Rental: ${order.rentalWeeks} weeks`,
      `Vacuum Seal Bags: ${order.vacuumSealBags ? 'Yes' : 'No'}`,
      ``,
      `Delivery Address: ${order.deliveryAddress}`,
      `Delivery Date: ${order.deliveryDate}`,
      `Pickup Date: ${order.pickupDate}`,
      ``,
      `Total: $${order.totalPrice.toFixed(2)}`,
      `${order.orderNotes ? `\nNotes: ${order.orderNotes}` : ''}`,
      ``,
      `---`,
      `Placed: ${order.createdAt}`,
    ].join('\n');

    const params = JSON.stringify({
      source_id: "gcal",
      tool_name: "send_email",
      arguments: {
        action: {
          action: "send",
          to: ["haroldgarcia123@gmail.com"],
          cc: [],
          bcc: [],
          subject: `New Order #${order.id}: ${order.packageName} - ${order.fullName}`,
          body: body,
          in_reply_to: null,
        },
      },
    });
    execSync(`external-tool call '${params.replace(/'/g, "'\\''")}'`);
    console.log(`Email notification sent for order #${order.id}`);
  } catch (err) {
    console.error("Failed to send email notification:", err);
  }
}

export async function registerRoutes(server: Server, app: Express) {
  // Create a new order
  app.post("/api/orders", (req, res) => {
    try {
      const parsed = insertOrderSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid order data", details: parsed.error.issues });
      }
      const order = storage.createOrder(parsed.data);
      // Send email notification (non-blocking)
      setTimeout(() => sendOrderNotification(order), 100);
      return res.status(201).json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({ error: "Failed to create order" });
    }
  });

  // Get all orders
  app.get("/api/orders", (_req, res) => {
    try {
      const allOrders = storage.getOrders();
      return res.json(allOrders);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  // Get a specific order
  app.get("/api/orders/:id", (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid order ID" });
      }
      const order = storage.getOrder(id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      return res.json(order);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch order" });
    }
  });
}
