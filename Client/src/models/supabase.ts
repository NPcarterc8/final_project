export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      post: {
        Row: {
          content: string | null
          date: string | null
          id: number | null
          location: string | null
          time: string | null
          userId: number | null
          workoutType: string | null
        }
        Insert: {
          content?: string | null
          date?: string | null
          id?: number | null
          location?: string | null
          time?: string | null
          userId?: number | null
          workoutType?: string | null
        }
        Update: {
          content?: string | null
          date?: string | null
          id?: number | null
          location?: string | null
          time?: string | null
          userId?: number | null
          workoutType?: string | null
        }
        Relationships: []
      }
      user: {
        Row: {
          age: number | null
          birth_date: string | null
          blood_group: string | null
          email: string | null
          eye_color: string | null
          first_name: string | null
          gender: string | null
          hair_color: string | null
          hair_type: string | null
          height: number | null
          id: number
          image: string | null
          ip: string | null
          last_name: string | null
          mac_address: string | null
          maiden_name: string | null
          password: string | null
          phone: string | null
          role: string | null
          university: string | null
          username: string | null
          weight: number | null
        }
        Insert: {
          age?: number | null
          birth_date?: string | null
          blood_group?: string | null
          email?: string | null
          eye_color?: string | null
          first_name?: string | null
          gender?: string | null
          hair_color?: string | null
          hair_type?: string | null
          height?: number | null
          id?: number
          image?: string | null
          ip?: string | null
          last_name?: string | null
          mac_address?: string | null
          maiden_name?: string | null
          password?: string | null
          phone?: string | null
          role?: string | null
          university?: string | null
          username?: string | null
          weight?: number | null
        }
        Update: {
          age?: number | null
          birth_date?: string | null
          blood_group?: string | null
          email?: string | null
          eye_color?: string | null
          first_name?: string | null
          gender?: string | null
          hair_color?: string | null
          hair_type?: string | null
          height?: number | null
          id?: number
          image?: string | null
          ip?: string | null
          last_name?: string | null
          mac_address?: string | null
          maiden_name?: string | null
          password?: string | null
          phone?: string | null
          role?: string | null
          university?: string | null
          username?: string | null
          weight?: number | null
        }
        Relationships: []
      }
      workout: {
        Row: {
          date: string | null
          duration: string | null
          id: number | null
          type: string | null
          userId: number | null
        }
        Insert: {
          date?: string | null
          duration?: string | null
          id?: number | null
          type?: string | null
          userId?: number | null
        }
        Update: {
          date?: string | null
          duration?: string | null
          id?: number | null
          type?: string | null
          userId?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
