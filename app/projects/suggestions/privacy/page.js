import React from "react";
import Header from "@/components/pages/mainHeader";
import Sideleft from "@/components/pages/side-left";
import Sideright from "@/components/pages/side-right";
import Link from "next/link";

export default function Suggestions() {
  return (
    <div>
      <main className="flex relative w-full h-full overflow-hidden">
        <Sideleft />
        <div className="flex flex-col w-full items-center min-h-[100px]">
          <div
            className="flex flex-col w-full items-center pb-2.5 border-b dark:border-white border-black"
            style={{ position: "relative" }}
          >
            <Header />
          </div>
          <div className="flex flex-col w-full items-center pt-10">
            <div className="block container">
              <h1 className="text-4xl">Privacy Policy</h1>
              <Link className="text-blurple" href="/projects/suggestions">
                <span>Suggestions Bot</span>
              </Link>
              <br />
              <br />
              <h2 className="text-2xl">Effective Date: 05.07.2023</h2>
              <br />
              <br />
              <p>
                We respect your privacy and are committed to protecting your
                personal information. This Privacy Policy describes how we
                collect, use, and disclose information when you use the
                &quot;Suggestions&quot; Discord bot (&quot;Bot&quot;) operated
                by us. By using the Bot, you consent to the practices described
                in this Privacy Policy.
              </p>
              <br />
              <h3 className="text-2xl">1. Information We Collect</h3>
              <p>
                1.1. User-Provided Information: When you use the Bot, you may
                provide us with certain information, such as your Discord
                username, user ID, and any content you submit through the Bot,
                including suggestions and comments.
                <br />
                1.2. Server Information: The Bot may collect information about
                the Discord server(s) you use it in, including server ID, server
                name, and other related metadata. This information is used to
                provide the Bot&apos;s functionality within the specific
                servers.
              </p>
              <br />
              <h3 className="text-2xl">2. Use of Information</h3>
              <p>
                2.1. We use the information collected to operate, maintain, and
                improve the Bot, including providing suggestions and managing
                user engagement.
                <br />
                2.2. We may use aggregated and anonymized data for statistical
                and analytical purposes to understand usage patterns and improve
                the Bot&apos;s features and performance.
                <br />
                2.3. We will not sell, trade, or rent your personal information
                to third parties for marketing or other purposes without your
                explicit consent. others.
              </p>
              <br />
              <h3 className="text-2xl">3. Data Retention</h3>
              <p>
                3.1. We retain your personal information for as long as
                necessary to fulfill the purposes outlined in this Privacy
                Policy, unless a longer retention period is required or
                permitted by law.
                <br />
                3.2. We may retain aggregated and anonymized data for as long as
                necessary for the purposes of analytics, improving the Bot, or
                complying with legal obligations.
              </p>
              <br />
              <h3 className="text-2xl">4. Data Security</h3>
              <p>
                4.1. We implement reasonable security measures to protect the
                information we collect and store. However, please note that no
                method of transmission over the internet or electronic storage
                is 100% secure, and we cannot guarantee absolute security.
              </p>
              <br />
              <h3 className="text-2xl">5. Third-Party Services</h3>
              <p>
                5.1. The Bot may integrate or interact with third-party services
                or websites. This Privacy Policy does not cover the practices of
                these third-party services, and we encourage you to review their
                privacy policies before providing any personal information to
                them.
              </p>
              <br />
              <h3 className="text-2xl">6. Changes to this Privacy Policy</h3>
              <p>
                6.1. We reserve the right to update or modify this Privacy
                Policy at any time. Any changes will be effective upon posting
                the revised Privacy Policy on our website or through the Bot. We
                encourage you to review this Privacy Policy periodically for any
                updates.
              </p>

              <br />
              <br />
              <span>
                By using the &quot;Suggestions&quot; Discord bot, you
                acknowledge that you have read, understood, and agreed to these
                Terms of Service. If you have any questions or concerns, please
                contact us at: <br />
                <Link
                  className="text-blurple"
                  href="https://discord.com/invite/VZebBhm3bY"
                >
                  https://discord.com/invite/VZebBhm3bY
                </Link>
                .
              </span>
            </div>
          </div>
        </div>
        <Sideright />
      </main>
    </div>
  );
}
