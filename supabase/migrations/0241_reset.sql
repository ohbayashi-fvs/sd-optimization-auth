


-- ユーザー登録時にprofilesテーブルにIDとユーザー名とテナントidを挿入する
create or replace function public.handle_insert_user()
returns trigger as $handle_insert_user$
begin
  RAISE WARNING 'メッセージ %', new;
  insert into public.profiles (id, user_name, tenant_id)
  values (new.id, new.raw_user_meta_data ->> 'user_name', cast(new.raw_user_meta_data ->> 'tenant_id' as uuid));
  return new as new_insert;
end;
$handle_insert_user$
language plpgsql
security definer set search_path = public;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_insert_user();



-- ユーザー更新時にprofilesテーブルにユーザー名とテナントidを代入する
create or replace function public.handle_update_user()
returns trigger as $handle_update_user$
begin
  RAISE WARNING 'メッセージ %', new;
  update public.profiles
  set user_name = new.raw_user_meta_data ->> 'user_name', tenant_id = cast(new.raw_user_meta_data ->> 'tenant_id' as uuid)
  from auth.users
  where public.profiles.id = new.id;
  return new as new_update;
end;
$handle_update_user$
language plpgsql
security definer set search_path = public;

-- trigger the function every time a user is updated
create trigger on_auth_user_updated
  after update on auth.users
  for each row execute procedure public.handle_update_user();
