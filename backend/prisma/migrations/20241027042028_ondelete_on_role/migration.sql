-- DropForeignKey
ALTER TABLE "permissions_category" DROP CONSTRAINT "permissions_category_roleId_fkey";

-- AddForeignKey
ALTER TABLE "permissions_category" ADD CONSTRAINT "permissions_category_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
