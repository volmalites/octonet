<template>
    <div>
        <div id="grid">
            <section>
                <vue-fontawesome class="icon" icon="cogs" size="12" color="white"></vue-fontawesome>
                <h1 class="line">Development of digital systems, intranets and/or extranets</h1>
                <h2 class="line">Intranet development</h2>
                <h3>An intranet is a computer network for sharing information, collaboration tools, operational systems, and other computing services within an organization, usually to the exclusion of access by outsiders.</h3>
                <h2>Extranet development</h2>
                <h3>An extranet is a controlled private network that allows access to partners, vendors and suppliers or an authorized set of customers – normally to a subset of the information accessible from an organization's intranet.</h3>
                <br>
                <p class="line">Having an intranet and/or an extranet can improve your workforce productivity and even automate certain tasks and/or services. Our solutions are tailor made to meet any specific need no matter what the requirements are.</p>
                <p>Our services yielded include:</p>
                <ol>
                    <li>Migration of information to a centralized digital network.</li>
                    <li>Hosting and/or management of existing systems.</li>
                    <li>Creation and/or hosting of new systems.</li>
                    <li>Integration of web APIs related to communications, digital marketing and/or financial services.</li>
                    <li>Integration of managed systems with existing websites and email.</li>
                    <li>Creation and integration of new websites and email with managed systems.</li>
                    <li>Integration of a user feedback system.</li>
                    <li>Management of digital marketing campaigns.</li>
                </ol>
                <p>If this of interest to you consider signing up for a free account with us, you will then be able to provide us with some information which would allow us to further evaluate how we can best assist you.</p>
                <p>If you have any questions, open a chatbox on the bottom of the page to talk to one of our representatives.</p>
                <p>Should you prefer a different means of contact, click here for a list of alternative contact methods.</p>
            </section>
            <section>
                <vue-fontawesome class="icon" icon="shield" size="12" color="white"></vue-fontawesome>
                <h1 class="line">Licensing, privacy and digital security</h1>
                <h2 class="line">Licensing</h2>
                <p>Any applications we develop remains unlicensed and copyright is contractually given to our client. Should any of our clients wish to license their applications for the purpose of leasing, we will be happy to assist in this regard.</p>
                <p>We do not take ownership of any of the following unless contractually agreed upon and stated in a manner whereby it becomes necessary in order to provide our services to our clients:</p>
                <ul>
                    <li>Domains</li>
                    <li>API accounts</li>
                    <li>Web Server accounts</li>
                    <li>Hosting accounts</li>
                </ul>
                <p>This decision is based upon protecting the rights of our clients. Our right remains on providing a service to our clients.</p>
                <h2>Privacy</h2>
                <p>Our operations are strictly in terms of the Protection of Personal Information Act No. 4 of 2013.</p>
                <p>We take every necessary step to ensure the security and privacy of our clients data. When developing an extranet, any application that deals with sensitive information or when migrating sensitive information to a centralized digital platform, we will communicate methods with our client in order to ensure this information is protected at their discretion.</p>
                <h2>Digital security</h2>
                <p>Our applications are developed in order to delegate proper user rights, levels of access and digital security that prevents malicious exploits. We also utilise well known technologies of encryption and  networking methods to further solidify the security of our applications.</p>
            </section>
            <section>
                <vue-fontawesome class="icon" icon="universal-access" size="12" color="white"></vue-fontawesome>
                <h1 class="line">Accessibility</h1>
                <p class="line">Our applications and applications administered by us will be amended and updated according to user feedback. This will also be done to make system applications more accessible and easy to use by users with disabilities.</p>
                <p>Following the The World Wide Web Consortium standards on Web Content Accessibility Guidelines (WCAG) 2.1 we strive to at minimum achieve level AA standards and work our way up to AAA standards from there.</p>
                <p>This ensures that our applications are easy to understand and extra user friendly. Accessibility is something that we take very seriously, this is why we pride ourselves on the use of a user feedback system which helps us amend and update our applications according to user requirements.</p>
                <p>We take great pride in the simplicity of our applications. This simplicity is achieved with great complexity under the hood, we take great pride in making our applications both easy to use and operable without much (if any) prior training.</p>
                <h3>Tailor made to satisfy your needs</h3>
            </section>
        </div>
        <WebChat />
    </div>
</template>

<script>
import WebChat from './WebChat'

export default {
  name: 'Services',
  components: {
    'WebChat': WebChat
  }
}
</script>

<style scoped>
    .icon {
        display: table;
        margin: 0 auto;
    }
</style>
