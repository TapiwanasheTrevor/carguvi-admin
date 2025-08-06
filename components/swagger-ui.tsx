"use client"

import { useEffect, StrictMode } from "react"
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

export default function SwaggerUIComponent() {
  useEffect(() => {
    // Suppress specific Swagger UI warnings in production
    if (process.env.NODE_ENV === 'production') {
      const originalWarn = console.warn
      console.warn = (...args) => {
        if (
          typeof args[0] === 'string' &&
          (args[0].includes('UNSAFE_componentWillReceiveProps') ||
           args[0].includes('ModelCollapse') ||
           args[0].includes('OperationContainer'))
        ) {
          return
        }
        originalWarn(...args)
      }

      return () => {
        console.warn = originalWarn
      }
    }
  }, [])

  useEffect(() => {
    // Add custom styling for dark mode support
    const style = document.createElement("style")
    style.textContent = `
      .swagger-ui {
        font-family: inherit;
      }
      .dark .swagger-ui .topbar {
        background-color: hsl(var(--background));
        border-bottom: 1px solid hsl(var(--border));
      }
      .dark .swagger-ui .topbar .download-url-wrapper .download-url-button {
        background-color: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
      }
      .dark .swagger-ui {
        background-color: hsl(var(--background));
        color: hsl(var(--foreground));
      }
      .dark .swagger-ui .info .title {
        color: hsl(var(--foreground));
      }
      .dark .swagger-ui .scheme-container {
        background-color: hsl(var(--card));
        border: 1px solid hsl(var(--border));
      }
      .dark .swagger-ui .opblock.opblock-post {
        background-color: hsl(var(--card));
        border-color: hsl(var(--border));
      }
      .dark .swagger-ui .opblock.opblock-get {
        background-color: hsl(var(--card));
        border-color: hsl(var(--border));
      }
      .dark .swagger-ui .opblock.opblock-put {
        background-color: hsl(var(--card));
        border-color: hsl(var(--border));
      }
      .dark .swagger-ui .opblock.opblock-delete {
        background-color: hsl(var(--card));
        border-color: hsl(var(--border));
      }
      .dark .swagger-ui .opblock.opblock-patch {
        background-color: hsl(var(--card));
        border-color: hsl(var(--border));
      }
      .dark .swagger-ui .opblock .opblock-summary {
        background-color: hsl(var(--card));
        border-color: hsl(var(--border));
      }
      .dark .swagger-ui .opblock .opblock-summary-description {
        color: hsl(var(--foreground));
      }
      .dark .swagger-ui .btn {
        background-color: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
        border: 1px solid hsl(var(--border));
      }
      .dark .swagger-ui .btn:hover {
        background-color: hsl(var(--primary));
        opacity: 0.9;
      }
      .dark .swagger-ui select {
        background-color: hsl(var(--background));
        color: hsl(var(--foreground));
        border: 1px solid hsl(var(--border));
      }
      .dark .swagger-ui input[type=text], .dark .swagger-ui textarea {
        background-color: hsl(var(--background));
        color: hsl(var(--foreground));
        border: 1px solid hsl(var(--border));
      }
      .dark .swagger-ui .parameters-col_description {
        color: hsl(var(--muted-foreground));
      }
      .dark .swagger-ui .response-col_status {
        color: hsl(var(--foreground));
      }
      .dark .swagger-ui .response-col_description {
        color: hsl(var(--muted-foreground));
      }
      .dark .swagger-ui .model-box {
        background-color: hsl(var(--card));
        border: 1px solid hsl(var(--border));
      }
      .dark .swagger-ui .model {
        color: hsl(var(--foreground));
      }
      .dark .swagger-ui table thead tr th {
        color: hsl(var(--foreground));
        border-bottom: 1px solid hsl(var(--border));
      }
      .dark .swagger-ui table tbody tr td {
        color: hsl(var(--foreground));
        border-bottom: 1px solid hsl(var(--border));
      }
      .dark .swagger-ui .parameter__name {
        color: hsl(var(--foreground));
      }
      .dark .swagger-ui .parameter__type {
        color: hsl(var(--muted-foreground));
      }
      .dark .swagger-ui .prop-type {
        color: hsl(var(--primary));
      }
      .swagger-ui .topbar {
        display: none;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <SwaggerUI
      url="/api-docs/openapi.yaml"
      docExpansion="list"
      defaultModelsExpandDepth={1}
      defaultModelExpandDepth={1}
      persistAuthorization={true}
      tryItOutEnabled={false}
    />
  )
}