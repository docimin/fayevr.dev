class AboutController < ApplicationController
  add_breadcrumb "about", :about_path
  def resumedownload
    send_file(
      "#{Rails.root}/public/files/resume.pdf",
      filename: "resume.pdf",
      type: "application/pdf"
    )
  end
end
