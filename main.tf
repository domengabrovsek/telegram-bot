terraform {
  required_version = ">= 0.13"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "< 5.0"
    }
  }
}

module "cloud_run" {
  source  = "GoogleCloudPlatform/cloud-run/google"
  version = "~> 0.2.0"

  # Required variables
  service_name = "telegram-bot-backend"
  project_id   = "domen-telegram-bot"
  location     = "europe-central2"
  image        = "gcr.io/domen-telegram-bot/telegram-bot-backend:latest"
  members      = ["allUsers"]
  ports        = { "name" : "http1", "port" : "3000" }
}

# output url of service to terminal
output "url" {
  value = module.cloud_run.service_url
}
