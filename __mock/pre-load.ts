import { PrismaClient } from '@prisma/client'
import goodlog from 'good-logs'
import { _mockData } from '__mock'

async function main() {
  const prisma = new PrismaClient()
  await prisma.product.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.verificationToken.deleteMany()
  await prisma.user.deleteMany()
  await prisma.product.createMany({ data: _mockData.products })
  await prisma.user.createMany({ data: _mockData.users })

  goodlog.log(' 🌱 Data pre-loaded')
}

main()
