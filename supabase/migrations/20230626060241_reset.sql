


-- ユーザー登録時にprofilesテーブルにIDとユーザー名とテナント名を挿入する
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, user_name, tenant_id)
  values (new.id, new.raw_app_meta_data ->> 'user_name', cast(new.raw_app_meta_data ->> 'tenant_id' as uuid));
  return new;
end;
$$;
-- cast(new.raw_app_meta_data ->>'user_id' as uuid),

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
