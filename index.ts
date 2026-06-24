import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

// PostgreSQL に接続するための準備をするぞ
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter, log: ["query"] });

async function main() {
  // ユーザーを 1 人作ってみる（実行するたびに増えるぞ）
  const newUser = await prisma.user.create({
    data: { name: `ユーザー ${new Date().toISOString()}` },
  });
  console.log("新しく追加したユーザー:", newUser);

  // 登録されているユーザーを全員取ってくる
  const users = await prisma.user.findMany();
  console.log("現在のユーザー一覧:", users);
}

main()
  .catch((e) => {
    console.error("エラーが発生しましたぞ:", e);
    process.exit(1);
  })
  .finally(() => Promise.all([prisma.$disconnect(), pool.end()]));
