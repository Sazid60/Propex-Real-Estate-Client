
# PROPEX

### Assignment_ID: Assignment12_category_0011

#### Category : Real Estate Website

#### Website URL: [https://propex-client.web.app/](https://propex-client.web.app/)
#### Server-Side epository: [https://github.com/Sazid60/Propex-Real-Estate-Client/](https://github.com/Sazid60/Propex-Real-Estate-Server)



## ADMIN LOGIN DETAILS
#### Admin-Email : admin@gmail.com
#### Admin-Password : PhB9A12@

## AGENT LOGIN DETAILS
#### Agent-Email : agent@gmail.com
#### Agent-Password : PhB9A12@

##### ***Use the mentioned login details to gets specific access***


#### Overview:
A MERN stack-powered real estate platform catering to users, agents, and admins. Users can browse, wishlist, and review properties, while agents manage listings and sales. Admins oversee platform operations for smooth functioning. Key features include advanced search, wishlist, secure payments, and comprehensive management tools. Transforming the real estate experience for seamless transactions and informed decisions. 

### Features & Characteristics:


#### Admin Features
- Admin can delete a user, make a user agent and make a user admin.
- Admin have special power to mark agent as fraud and this will remove all the data of the fraud agent.
- Fraud marked agents can not add any property further.
- Admin have right to reject or verify a property.
- if admin do not verify the property the property will not appear in the all properties page.
- Admin can advertise any property after verification which will show in the home page advertisement section.
- Admin has right to delete any users review

#### Agents Features
- Agent can add, update or delete properties he/she has added.
- If a user offers for a property it will appear in agents requested property page.
- Agents has right to reject and accept the users offers.
- If Multiple offers are there accepting one others offer will be automatically rejected.
- If agent accepts offer user will be able to pay the amount using stripe
- If agent rejects a offer user's page will be automatically updated.
- Agent dashboard stat will show the total properties, sold properties and total income of an agent.

#### Users Features
- user can search property according to his/her preferences.
- Users can go through property details page and add reviews a well as can add any property to wishlist
- users can manage(delete) their wishlist and reviews.
- From the wishlist user can make an offer of a property to the agent.
- If The agent accepts the offer user will be able to pay the offered amount using stripe.

#### Security Related Features
- Except the home page all the routes are made private.
- Dashboard is protected for all category users.
- Data is protected using jwt.
- Used local storage for token.
- If any violation happens user will be logged out and redirected to login page.


### Technologies used : 
React.js | HTML5 | Tailwind CSS | Daisy UI | Mamba UI | Meraki UI | Node.js | Express.js | MongoDB | JWT | Firebase | Axios | Tanstack Query


