class AboutController < ApplicationController
  def resumedownload
    send_file(
      "#{Rails.root}/public/resume.pdf",
      filename: "resume.pdf",
      type: "application/pdf"
    )
  end
end
