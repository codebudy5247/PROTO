import { db } from "@/server/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/utils";

const Dashboard = async () => {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Sales"
          subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
          body={formatCurrency(salesData.totalSalesAmount)}
        />
        <DashboardCard
          title="Customers"
          subtitle={`${formatCurrency(
            userData.averageValuePerUser,
          )} Average Value`}
          body={formatNumber(userData.userCount)}
        />
        <DashboardCard
          title="Active Products"
          subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
          body={formatNumber(productData.activeCount)}
        />
      </div>
    </main>
  );
};

export default Dashboard;

type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}

async function getSalesData() {
  const totalNumberOfSales = await db.orderProduct.aggregate({
    _sum: {
      quantity: true,
    },
  });

  const totalSalesAmount = await db.order.aggregate({
    _sum: {
      netAmount: true,
    },
    where: {
      payment: {
        some: {
          isPaymentDone: true,
        },
      },
    },
  });

  const salesAmount = totalSalesAmount._sum.netAmount?.toNumber() ?? 0;

  return {
    numberOfSales: totalNumberOfSales._sum.quantity ?? 0,
    totalSalesAmount: salesAmount,
  };
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { netAmount: true },
      where: {
        payment: {
          some: {
            isPaymentDone: true,
          },
        },
      },
    }),
  ]);

  const totalNetAmount = orderData._sum.netAmount?.toNumber() ?? 0;

  return {
    userCount,
    averageValuePerUser: userCount === 0 ? 0 : totalNetAmount / userCount,
  };
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { published: true } }),
    db.product.count({ where: { published: false } }),
  ]);

  return { activeCount, inactiveCount };
}
