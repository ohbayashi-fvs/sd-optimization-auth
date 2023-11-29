INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at") VALUES
	('00000000-0000-0000-0000-000000000000', 'f430fcee-7405-445b-8fb8-bd49375a8e92', 'authenticated', 'authenticated', 'hoge@com', '$2a$10$RxSqmu.WoLvme8ZX1HsQUOXUMOi/v4koR5N2X0ajxKqq3OXU9g1KC', '2023-11-24 01:22:16.606001+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-11-24 02:30:30.635592+00', '{"tenant_id":"122c8ed3-9b92-4db7-83df-20087255a5eb","user_name":"私です"}', '{}', NULL, '2023-11-22 08:48:43.538637+00', '2023-11-24 02:30:30.637215+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', 'c2bc52a0-a6fa-4fab-b7d8-eebc6971961f', 'authenticated', 'authenticated', 'ohbayashi@arsaga.jp', '$2a$10$GBTx5KMd0U6L4W0Zz4ogNeScuE733lQJHqU.BgBONFHKGYbkgXJHi', '2023-08-09 08:21:12.630803+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider":"email","providers":["email"],"user_name":"大林"}', NULL, NULL, '2023-08-09 08:21:12.630803+00', '2023-11-24 06:19:44.636442+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', 'aa450975-1123-4f0a-b26d-ee8f4c1c6a8f', 'authenticated', 'authenticated', 'harada@arsaga.jp', '$2a$10$OT9rIvpq7QpU.Vu3oZ4e5OjIIStQw8er2YmXxmJtj7mEwsu2v2LbC', '2023-11-24 02:51:25.820651+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-11-24 04:09:30.183603+00', '{"provider":"email","providers":["email"],"user_name":"原田"}', '{}', NULL, '2023-11-24 02:51:25.814811+00', '2023-11-24 04:09:30.185368+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);

 INSERT INTO "public"."tenants" ("id", "tenant_name", "created_at", "updated_at") VALUES
	('f6212863-24b5-43f9-b5b0-668ad8d8df16','販売部門','2023-11-28 00:00:00.000000','2023-11-28 02:30:09.871603'),
	('13f6bbaa-fbdf-4f95-b9b6-dc1889dc5673','調達部門','2023-11-28 00:00:01.000000','2023-11-28 13:13:52.473878'),
	('820682ce-3d0b-416e-b5bf-e10653d91838','製造部門','2023-11-28 00:00:02.000000','2023-11-28 13:14:04.972304'),
	('122c8ed3-9b92-4db7-83df-20087255a5eb', '技術部門', '2023-11-28 00:00:03.000000', '2023-08-09 06:47:41.992603'),
	('92fdf322-5be0-4a2d-8832-435ace8ec44b','品質保証部門','2023-11-28 00:00:04.000000','2023-11-28 13:14:15.770725'),
	('78020c72-a240-467e-9e7e-473a0c1c5480','経営管理部門','2023-11-28 00:00:05.000000','2023-11-28 13:14:32.052686');
	-- ('2c8705b1-d7df-482f-a0e9-24aaed230d62', '顧客管理課', '2023-08-09 06:47:42.062649', '2023-08-09 06:47:42.062649');

INSERT INTO "public"."ip_address" ("addresses", "created_at", "updated_at") VALUES
	('192.168.65.1', '2023-11-06 01:48:42.174833', '2023-11-06 01:48:42.174833'),
	('218.219.100.238, 172.68.119.145', '2023-11-06 01:50:13.551008', '2023-11-06 01:50:13.551008'),
	('219.59.17.174, 172.70.233.121', '2023-11-06 01:50:28.212126', '2023-11-06 01:50:28.212126');

