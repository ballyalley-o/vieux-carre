import { PrismaClient } from '@prisma/client'
import goodlog from 'good-logs'
import { _mockData } from '__mock'

async function main() {
  const prisma = new PrismaClient()
  await prisma.product.deleteMany()
  await prisma.product.createMany({ data: _mockData.products })

  goodlog.log(' 🌱 Data pre-loaded')
}

main()
