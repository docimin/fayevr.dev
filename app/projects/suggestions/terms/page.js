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
              <h1 className="text-4xl">Terms of Service</h1>
              <Link className="text-blurple" href="/projects/suggestions">
                <span>Suggestions Bot</span>
              </Link>
              <br />
              <br />
              <h2 className="text-2xl">Effective Date: 05.07.2023</h2>
              <br />
              <br />
              <p>
                Please read these Terms of Service (&quot;Terms&quot;) carefully
                before using the &quot;Suggestions&quot; Discord bot
                (&quot;Bot&quot;) operated by Sushi Roll (&quot;We,&quot;
                &quot;Us,&quot; or &quot;Our&quot;). By using the Bot, you agree
                to be bound by these Terms. If you do not agree with any part of
                these Terms, you should not use the Bot.
              </p>
              <br />
              <h3 className="text-2xl">1. Bot Functionality</h3>
              <p>
                The Bot allows users to submit suggestions and upvote or
                downvote existing suggestions within Discord servers. The Bot is
                designed to facilitate user engagement and feedback within the
                server.
              </p>
              <br />
              <h3 className="text-2xl">2. User Conduct</h3>
              <p>
                By using the Bot, you agree to the following: <br />
                <br />
                2.1. You will use the Bot in compliance with all applicable laws
                and regulations.
                <br />
                2.2. You will not use the Bot to distribute or share any content
                that is unlawful, harmful, defamatory, infringing, or otherwise
                objectionable.
                <br />
                2.3. You will not use the Bot to harass, threaten, or intimidate
                others.
                <br />
                2.4. You will not use the Bot to distribute spam, unsolicited
                messages, or any form of advertising.
                <br />
                2.5. You will not attempt to disrupt or interfere with the
                functioning of the Bot or any associated services.
              </p>
              <br />
              <h3 className="text-2xl">3. Suggestions and Content</h3>
              <p>
                3.1. By submitting suggestions through the Bot, you grant us a
                worldwide, non-exclusive, royalty-free license to use, modify,
                reproduce, distribute, and display the suggestions for the
                purposes of operating and improving the Bot.
                <br />
                3.2. You acknowledge that we do not endorse, guarantee, or
                assume any responsibility for the accuracy, integrity, or
                quality of any suggestions submitted or upvoted/downvoted
                through the Bot.
                <br />
                3.3. We reserve the right to remove or delete any suggestions or
                content that violate these Terms or are otherwise objectionable
                in our sole discretion.
              </p>
              <br />
              <h3 className="text-2xl">4. Limitations of Liability</h3>
              <p>
                4.1. We provide the Bot on an &quot;as is&quot; and &quot;as
                available&quot; basis. We do not make any warranties, express or
                implied, regarding the Bot&apos;s availability, reliability, or
                suitability for any particular purpose.
                <br />
                4.2. We shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages arising out of or
                relating to the use or inability to use the Bot, even if we have
                been advised of the possibility of such damages.
                <br />
                4.3. In no event shall our total liability to you for all
                damages, losses, or causes of action exceed the amount you have
                paid, if any, to us for accessing or using the Bot.
              </p>
              <br />
              <h3 className="text-2xl">5. Modifications and Termination</h3>
              <p>
                We reserve the right to modify or terminate the Bot or these
                Terms at any time, without prior notice. We may also restrict or
                terminate your access to the Bot for any reason, without
                liability.
              </p>
              <br />
              <h3 className="text-2xl">6. Miscellaneous</h3>
              <p>
                6.1. These Terms constitute the entire agreement between you and
                us regarding the Bot and supersede any prior agreements or
                understandings.
                <br />
                6.2. If any provision of these Terms is found to be
                unenforceable or invalid, the remaining provisions shall
                continue to be in full force and effect.
                <br />
                6.3. These Terms shall be governed by and construed in
                accordance with the laws of [Your Jurisdiction], without regard
                to its conflict of laws principles.
                <br />
                6.4. Any disputes arising out of or relating to these Terms or
                the Bot shall be subject to the exclusive jurisdiction of the
                courts located in [Your Jurisdiction].
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
