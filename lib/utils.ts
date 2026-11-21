import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024

export function getUploadedImage(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName)

  if (!value || typeof value === "string" || value.size === 0) {
    return null
  }

  return value
}

export function validateUploadedImage(file: File | null) {
  if (!file) return null
  if (!file.type.startsWith("image/")) return "Only image files are allowed"
  if (file.size > MAX_IMAGE_SIZE) return "Image must be smaller than 5MB"
  return null
}

export function toUploadFormData(formData: FormData, imageFieldName: string) {
  const payload = new FormData()

  formData.forEach((value, key) => {
    if (key === imageFieldName) {
      if (typeof value !== "string" && value.size > 0) {
        payload.append(key, value)
      }
      return
    }

    if (typeof value === "string" && value.trim() !== "") {
      payload.append(key, value)
    }
  })

  return payload
}
