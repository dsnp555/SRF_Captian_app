-- Create user_subscriptions table to store subscription data
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    plan_id TEXT NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('active', 'expired', 'cancelled')),
    payment_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Foreign key that references the auth.users table
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create an index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON public.user_subscriptions(user_id);

-- Set up row level security (RLS) policies
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to view only their own subscriptions
CREATE POLICY user_subscriptions_select ON public.user_subscriptions 
    FOR SELECT USING (auth.uid() = user_id);

-- Policy to allow users to insert only their own subscriptions
CREATE POLICY user_subscriptions_insert ON public.user_subscriptions 
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to update only their own subscriptions
CREATE POLICY user_subscriptions_update ON public.user_subscriptions 
    FOR UPDATE USING (auth.uid() = user_id);

-- Create a custom function to check if a user has an active subscription
CREATE OR REPLACE FUNCTION public.check_active_subscription(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    has_subscription BOOLEAN;
BEGIN
    SELECT EXISTS(
        SELECT 1 
        FROM public.user_subscriptions 
        WHERE 
            user_subscriptions.user_id = check_active_subscription.user_id 
            AND status = 'active' 
            AND end_date > NOW()
    ) INTO has_subscription;
    
    RETURN has_subscription;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
