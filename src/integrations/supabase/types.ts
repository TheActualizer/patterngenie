export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      orders: {
        Row: {
          amount_paid: number
          buyer_id: string | null
          commission_fee: number
          created_at: string
          id: string
          pattern_id: string | null
          status: string | null
          stripe_payment_id: string | null
        }
        Insert: {
          amount_paid: number
          buyer_id?: string | null
          commission_fee: number
          created_at?: string
          id?: string
          pattern_id?: string | null
          status?: string | null
          stripe_payment_id?: string | null
        }
        Update: {
          amount_paid?: number
          buyer_id?: string | null
          commission_fee?: number
          created_at?: string
          id?: string
          pattern_id?: string | null
          status?: string | null
          stripe_payment_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_pattern_id_fkey"
            columns: ["pattern_id"]
            isOneToOne: false
            referencedRelation: "patterns"
            referencedColumns: ["id"]
          },
        ]
      }
      patterns: {
        Row: {
          category: Database["public"]["Enums"]["pattern_category"]
          created_at: string
          description: string | null
          designer_id: string | null
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          file_urls: Json | null
          format: Database["public"]["Enums"]["pattern_format"][]
          id: string
          is_approved: boolean | null
          last_version_update: string | null
          price: number
          sales_count: number | null
          thumbnail_url: string | null
          title: string
          total_revenue: number | null
          updated_at: string
          version: string | null
          views: number | null
        }
        Insert: {
          category: Database["public"]["Enums"]["pattern_category"]
          created_at?: string
          description?: string | null
          designer_id?: string | null
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          file_urls?: Json | null
          format: Database["public"]["Enums"]["pattern_format"][]
          id?: string
          is_approved?: boolean | null
          last_version_update?: string | null
          price: number
          sales_count?: number | null
          thumbnail_url?: string | null
          title: string
          total_revenue?: number | null
          updated_at?: string
          version?: string | null
          views?: number | null
        }
        Update: {
          category?: Database["public"]["Enums"]["pattern_category"]
          created_at?: string
          description?: string | null
          designer_id?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          file_urls?: Json | null
          format?: Database["public"]["Enums"]["pattern_format"][]
          id?: string
          is_approved?: boolean | null
          last_version_update?: string | null
          price?: number
          sales_count?: number | null
          thumbnail_url?: string | null
          title?: string
          total_revenue?: number | null
          updated_at?: string
          version?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "patterns_designer_id_fkey"
            columns: ["designer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_front_url: string | null
          avatar_side_url: string | null
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          last_active_at: string | null
          measurement_units: string | null
          measurements: Json | null
          preferences: Json | null
          role: Database["public"]["Enums"]["user_role"] | null
          stripe_account_id: string | null
          stripe_customer_id: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_front_url?: string | null
          avatar_side_url?: string | null
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          last_active_at?: string | null
          measurement_units?: string | null
          measurements?: Json | null
          preferences?: Json | null
          role?: Database["public"]["Enums"]["user_role"] | null
          stripe_account_id?: string | null
          stripe_customer_id?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_front_url?: string | null
          avatar_side_url?: string | null
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          last_active_at?: string | null
          measurement_units?: string | null
          measurements?: Json | null
          preferences?: Json | null
          role?: Database["public"]["Enums"]["user_role"] | null
          stripe_account_id?: string | null
          stripe_customer_id?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_draft: boolean | null
          pattern_data: Json
          title: string
          updated_at: string | null
          user_id: string | null
          version: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_draft?: boolean | null
          pattern_data?: Json
          title: string
          updated_at?: string | null
          user_id?: string | null
          version?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_draft?: boolean | null
          pattern_data?: Json
          title?: string
          updated_at?: string | null
          user_id?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          pattern_id: string | null
          rating: number | null
          reviewer_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          pattern_id?: string | null
          rating?: number | null
          reviewer_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          pattern_id?: string | null
          rating?: number | null
          reviewer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_pattern_id_fkey"
            columns: ["pattern_id"]
            isOneToOne: false
            referencedRelation: "patterns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      difficulty_level: "beginner" | "intermediate" | "advanced"
      pattern_category:
        | "dresses"
        | "tops"
        | "bottoms"
        | "outerwear"
        | "accessories"
        | "children"
        | "other"
      pattern_format: "pdf" | "dxf" | "svg"
      user_role: "buyer" | "designer" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
