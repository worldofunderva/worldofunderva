
-- Drop the function and its dependent trigger (auto-grants admin+operator to every signup)
DROP FUNCTION IF EXISTS public.handle_new_user_role() CASCADE;
