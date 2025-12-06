"use client"
import { formatCurrency, formatDate, prettyStatus } from "@/lib/utils";
import { Order } from "@/types/orders";

import {
  LucideClock,
  LucideMapPin,
  LucideRulerDimensionLine,
  LucideUserRound,
  LucideDollarSign,
  LucideHistory,
  LucideTruck
} from "lucide-react";



export default  function Orders({orders}: {orders: Order[]}) {
  const totalOrders = orders.length;
  const totalEarnings = orders.reduce((sum, o) => sum + (o.totalFare ?? 0), 0);

  if (totalOrders === 0) {
    return <NoOrders />;
  }

  return (
    <div className="h-full w-full">
        <h1 className="flex text-4xl font-bold p-5">Orders</h1>
      <div className="flex flex-col bg-[#f6fafd] h-full w-full m-5">
        <h1 className="flex w-full text-2xl text-gray-600 p-5">View Your Orders History</h1>
        <div className="flex w-full">
        <div className="flex flex-col items-center justify-evenly w-1/4 h-[40dvh] m-5 rounded-4xl bg-[#e2f1ec] gap-5">

          <div className="flex bg-green-700 w-20 h-15 rounded-2xl items-center justify-center">
            <LucideDollarSign className="text-background size-10" />
          </div>

          <div className="flex flex-col gap-5 items-center">
            <h1 className="text-gray-600 text-2xl">Total Earnings</h1>
            <span className="text-green-600 text-2xl">{formatCurrency(totalEarnings)}</span>
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-gray-600 text-2xl">Total Orders</h1>
            <span className="text-green-600 text-2xl">{totalOrders}</span>
          </div>
        </div>

        <div className="flex flex-col w-3/4 h-full p-5 gap-5">
          <h1 className="text-4xl text-gray-600">Orders</h1>

          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col bg-background w-[70%] p-5 gap-4 rounded-4xl shadow-sm"
              >
                <div className="flex w-full justify-between items-center">
                  <div>
                    <h2 className="text-gray-500 text-2xl">Order #{order.id}</h2>
                    <p className="text-sm text-gray-400">Created: {formatDate(order.createdAt)}</p>
                  </div>

                  <div className="flex items-end flex-col">
                    <span className="text-green-700 text-3xl">{formatCurrency(order.totalFare)}</span>
                    <span className="text-xs text-gray-500">{prettyStatus(order.status)}</span>
                  </div>
                </div>

                <div className="flex gap-5 items-center">
                  <LucideMapPin className="text-blue-600" />
                  <span>{order.pickupLocation ?? "Unknown pickup"}</span>
                </div>

                <div className="flex gap-5 items-center">
                  <LucideMapPin className="text-red-500" />
                  <span>{order.destinationLocation ?? "Unknown destination"}</span>
                </div>

                <div className="flex gap-6 justify-between items-center">
                  <div className="flex items-center gap-3">
                    <LucideUserRound />
                    <div>
                      <div className="text-sm font-medium">{order.acceptedDriverName ?? "No driver"}</div>
                      <div className="text-xs text-gray-500">{order.acceptedDriverPhone ?? ""}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <LucideTruck />
                    <div className="text-sm">
                      <div>{order.acceptedVehicleModel ?? "-"}</div>
                      <div className="text-xs text-gray-500">{order.acceptedVehicleNumber ?? "-"}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <LucideRulerDimensionLine />
                    <span>{order.distance ? `${Number(order.distance).toFixed(1)} km` : "-"}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <LucideClock />
                    <div className="text-sm">
                      <div>Accepted: {order.acceptedAt ? formatDate(order.acceptedAt) : "-"}</div>
                      <div className="text-xs text-gray-500">ETA: {order.estimatedTime ?? "-" } mins</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
        </div>
      </div>
    </div>
  );
}

function NoOrders() {
  return (
    <div className="flex w-full">
      <div className="flex flex-col m-5 p-5 w-full">
        <h1 className="flex text-4xl">Orders</h1>
        <div className="flex flex-col w-full m-5 bg-gray-100 rounded-4xl gap-8 h-[60dvh]">
          <h1 className="flex p-5 w-full h-20">View your Orders and details here</h1>
          <div className="flex flex-col items-center justify-center h-80 gap-8">
            <LucideHistory className="size-15 text-gray-500" />
            <h1 className="text-4xl">No Orders Yet</h1>
            <p className="text-2xl font-light">Your orders will appear here once they are created</p>
          </div>
        </div>
      </div>
    </div>
  );
}
