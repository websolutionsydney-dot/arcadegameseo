/** The small SQLite interface used by the original enquiry handler. */
export type SqlValue = string | number | null;
export interface EnquiryStatement {
  bind(...values: SqlValue[]): EnquiryStatement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run(): Promise<{ meta: { changes: number } }>;
}
export interface EnquiryDatabase {
  prepare(sql: string): EnquiryStatement;
}
export interface EnquiryEnvironment {
  DB?: EnquiryDatabase;
  RESEND_API_KEY?: string;
}
