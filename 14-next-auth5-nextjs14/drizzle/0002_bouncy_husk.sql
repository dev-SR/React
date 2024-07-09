CREATE TABLE IF NOT EXISTS "email_verification_toke" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"token" text NOT NULL,
	"email" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "email_verification_toke_id_token_pk" PRIMARY KEY("id","token")
);
