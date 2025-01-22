'use client'
import { FC } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { useAppColors } from 'hook'
import { formatCurrency } from 'lib'

interface ChartProps {
  data: { salesData: SalesData }
}
const Chart: FC<ChartProps> = ({ data: { salesData } }) => {
  const palette = useAppColors()
  return (
    <ResponsiveContainer width={'100%'} height={350}>
      <BarChart data={salesData}>
        <XAxis dataKey={'month'} stroke={palette.chart.stroke} fontSize={10} tickLine axisLine />
        <YAxis stroke={palette.chart.stroke} fontSize={10} tickLine axisLine={false} tickFormatter={(value) => `${formatCurrency(value)}`} />
        <Bar dataKey={'totalSales'} fill={'currentColor'} radius={[4,4,0,0]} className={'fill-primary'} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default Chart
