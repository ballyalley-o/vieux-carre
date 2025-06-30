import { PrismaClient } from '@prisma/client'
import { GLOBAL } from 'vieux-carre'
import goodlog from 'good-logs'
import bcrypt from 'bcryptjs'
import { _mockData } from '__mock'

async function main() {
  const prisma = new PrismaClient()
  await prisma.product.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.verificationToken.deleteMany()
  await prisma.user.deleteMany()
  await prisma.product.createMany({ data: _mockData.products })
  const users = [];
  for (let i = 0; i < _mockData.users.length; i++) {
    users.push({
      ..._mockData.users[i],
      password: await bcrypt.hash(_mockData.users[i].password, GLOBAL.HASH.SALT_ROUNDS),
    });
  }
  await prisma.user.createMany({ data: users });
  goodlog.log(' 🌱 Data pre-loaded')
}

main()
