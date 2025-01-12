import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type Pattern = Database["public"]["Tables"]["patterns"]["Row"] & {
  profiles: { full_name: string | null } | null;
};

export async function loadMarketplacePatterns(
  category: string,
  difficulty: string,
  sortBy: string
) {
  try {
    let query = supabase
      .from('patterns')
      .select('*, profiles(full_name)')
      .eq('is_approved', true);

    if (category && category !== "all") {
      query = query.eq('category', category);
    }
    if (difficulty && difficulty !== "all") {
      query = query.eq('difficulty', difficulty);
    }

    switch (sortBy) {
      case 'popular':
        query = query.order('sales_count', { ascending: false });
        break;
      case 'price-low':
        query = query.order('price', { ascending: true });
        break;
      case 'price-high':
        query = query.order('price', { ascending: false });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error loading patterns:', error);
    throw error;
  }
}

export async function handlePatternPurchase(patternId: string) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('No active session');
    }

    const response = await supabase.functions.invoke('create-pattern-checkout', {
      body: { patternId },
    });

    const { data: { url }, error } = response;
    if (error) throw error;
    return url;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

export async function checkUserRole() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      
      return profile?.role || null;
    }
    return null;
  } catch (error) {
    console.error('Error checking user role:', error);
    throw error;
  }
}