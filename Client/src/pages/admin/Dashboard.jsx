import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {

  const {data, isSuccess, isError, isLoading} = useGetPurchasedCoursesQuery();

  if(isLoading) return <h1>Loading...</h1>
  if(isError) return <h1 className="text-red-500">Failed to get purchased course</h1>

  //
  const {purchasedCourse} = data || [];

  const courseData = purchasedCourse.map((course)=> ({
    name:course.courseId.courseTitle,
    price:course.courseId.coursePrice
  }))

  const totalRevenue = purchasedCourse.reduce((acc,element) => acc+(element.amount || 0), 0);

  const totalSales = purchasedCourse.length;
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{totalRevenue}</p>
        </CardContent>
      </Card>

      {/* Course Prices Card */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Course Prices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
  <LineChart
    data={courseData}
    margin={{
      top: 20,
      right: 30,
      left: 20,
      bottom: 60,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis
      dataKey="name"
      angle={-30}
      textAnchor="end"
      interval={0}
      height={80}
    />
    <YAxis />
    <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
    <Line
      type="monotone"
      dataKey="price"
      stroke="#4a90e2"
      strokeWidth={3}
    />
  </LineChart>
</ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;