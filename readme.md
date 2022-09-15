> 🛠 **Status: Maintenance Mode | Stable**
>
> This project is currently in [maintenance mode](https://en.wikipedia.org/wiki/Maintenance_mode) - users should feel free to continue to use this app and expect bug fixes, but not expect many additional features.

## Resonate Verifiable Credentials

This is Resonate's reference implementation of the [Verifiable Credentials Data Model](https://www.w3.org/TR/vc-data-model/) ("VC"). It is intended to explain the theory of our implementation (our "VC Architecture") and provide a working example.

There are four layers to the implementation

1. Application (vc-app). This is a reference implementation for how Resonate Applications, particularly our player, will interact with the VC Architecture. It is a Node.js (Express) app. An example of a production application in this layer is the [Resonate Player](https://github.com/resonatecoop/user-api).

2. VC Layer (vc-layer-api). This is a dummy VC layer API provided by [Verifiable Credentials Ltd](https://verifiablecredentials.info/), containing dummy endpoints performing the following functions:
  - Issuer
  - Holder
  - Verifier
  
For definitions of these concepts, and descriptions of how they work together, please see the [Verifiable Credentials Data Model](https://www.w3.org/TR/vc-data-model/).

3. User API (vc-user-api). This is a reference implementation for how the Resonate User API will interact with the VC Architecture. It is a Node.js app. The production [User API](https://github.com/resonatecoop/user-api) is also open source, albeit currently being overhauled (the published repository will soon be significantly updated, including the production version of this reference) 

4. Service ([discourse-verifiable-credentials](https://github.com/paviliondev/discourse-verifiable-credentials)). This is a reference implementation for how the Resonate VC Architecture will be used by services, both inside and outside the Resonate ecosystem. It is an open source [Discourse](https://discourse.org) Plugin that generically implements the VC Verification, with a specific implementation of Resonate's VC implementation.

### Use Case

The reference implementation contains a complete and working example of the reference use case:

1. Verifying whether a person has paid for content produced by, or performances conducted by, an artist.

2. Granting access to restricted content and engagement based on the verification.

A few things to note about this use case:

1. The granting of the credential can occur at various places in the Resonate ecosystem, and / or via Resonate partner organisations.

2. Any service, whether controlled by Resonate or not, can use credentials produced by the Resonate VC Architecture.

3. Resonate Verifiable Credentials contain metadata that can be further for more granular or varied access depending on the relevant resource policy of the Service.

### Running the implementation

To see the reference implementation in action you need to run all four layers. Open a new terminal for each and leave it running

#### Application

```
## From this repositories' base directory
cd vc-app
npm install
npm start
```
#### VC Layer API

The instructions on how to set this up are in the document "Installing_the_Dummy_Verifiable_Credentials_Layer.docx", see "Installation Instructions". Once you have your dummy wallet in your home directory, the ``node-red`` server running, and the "DummyVCLayer.json" installed leave this server running.

Make sure you run ``node-red`` in the same directory where your ``VCredentials.json`` file is located.

#### VC User API

```
## From this repositories' base directory
cd vc-user-api
npm install
node app.js
```
#### Service

Set up Discourse locally following the relevant guide in [this list](https://meta.discourse.org/tag/dev-install), then move the discourse-verifiable-credentials folder in your local Discourse ``plugins`` folder.

Before you start the server, create yourself an admin user, if you haven't already
```
rake admin:create
```

Restart the server, then create a session with the admin user by going to
``http://localhost:3000/session/YOUR_USERNAME/become`` (change YOUR_USERNAME to the username of the admin user you created).

You should now be logged into your local discourse as an admin user.

### Using the implementation

Once you have the implementation running locally (see above; you should have four seperate apps running), you can use the implementation like so

1. In the Application you should see a Player UI with a "Purchase" action. Purchasing an Album is one way a credential can be obtained in the Resonate ecosystem. Click the "Purchase button". Once the album is purchased the Application interacts with the VC Layer to issue the relevant credential.

2. Then go over to your local Discourse instance running the discourse-verifiable-credentials plugin. As an admin, create a group for the artist who made the Album and set the "Membership > Access" permissions to "Allow users to send membership requests to group owners"

3. Open an incognito window and create a new (non-admin) user account by signing up normally, then navigate to the page of the group you created in 2. You should see a "Verify Credential" button beneath the group description.

When you click the "Verify Credential" button the Discourse Plugin will use the VC Layer (both the Holder's wallet and the Verifier) to verify that the user has the relevant credential, and add them to the group if they do.

### License

This reference implementation has been prepared by [Pavilion](https://thepavilion.io) on behalf of Resonate. It includes software provided by [Verifiable Credentials Ltd](https://verifiablecredentials.info/) and [Pavilion Community Ltd](https://thepavilion.io) in the form of git submodules. Those submodules remain the property of their creators. The remainder of the repository is the property of Resonate and is licensed under the GNU GPL v2.
 

