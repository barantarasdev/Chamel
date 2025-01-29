-- CreateTable
CREATE TABLE "Token_blacklist" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Token_blacklist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_blacklist_token_key" ON "Token_blacklist"("token");
