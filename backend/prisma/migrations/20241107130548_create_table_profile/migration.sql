-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "occupation" TEXT,
    "profileImageUrl" TEXT,
    "status" TEXT,
    "bio" TEXT,
    "secondaryEmail" TEXT,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_secondaryEmail_key" ON "profiles"("secondaryEmail");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
