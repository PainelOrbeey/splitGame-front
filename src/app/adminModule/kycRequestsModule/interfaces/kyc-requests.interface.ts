export interface KycRequest {
  id: string
  companyName: string
  companyDocument: string
  requestDate: Date
  status: "pending" | "under_review" | "approved" | "rejected"
  priority: "low" | "medium" | "high" | "urgent"
  assignedTo?: string
  documents: KycDocument[]
  lastUpdate: Date
  notes?: string
}

export interface KycDocument {
  id: string
  name: string
  type: string
  url: string
  uploadDate: Date
  status: "pending" | "approved" | "rejected"
}

export interface KycComment {
  id: string
  author: string
  message: string
  timestamp: Date
  type: "info" | "warning" | "error" | "success"
}

export interface KycFilters {
  status: string[]
  priority: string[]
  assignedTo: string
  dateRange: {
    start: Date | null
    end: Date | null
  }
  searchTerm: string
}

export interface KycMetrics {
  totalRequests: number
  pendingRequests: number
  approvedRequests: number
  rejectedRequests: number
  averageProcessingTime: number
}
