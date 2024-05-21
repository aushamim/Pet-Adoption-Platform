# Happy Tails (Back-End)

### API created using Django Rest Framework (DRF)

#

### Live Link: [HappyTails (Back-End)](https://pet-adoption-platform.onrender.com)

#

### Run the following command to start the project

`py manage.py runserver `

#

## Database Setup

- Create a `.env` file in the **HappyTals** folder.
- Paste and Provide the following without qoutation
- ```shell
   NAME=<DB Name>
   USER=<DB User>
   PASSWORD=<DB Password>
   HOST=localhost
   PORT=5432
  ```

#

## API Documentation

- ### User
  - Registration
  - API Route: `/user/register/` [↗️](https://pet-adoption-platform.onrender.com/user/register/)
  -
  - Login
  - API Route: `/user/login/` [↗️](https://pet-adoption-platform.onrender.com/user/login/)
  -
  - Logout
  - API Route: `/user/logout/` [↗️](https://pet-adoption-platform.onrender.com/user/logout/)
  -
  - All Users
  - API Route: `/user/list/` [↗️](https://pet-adoption-platform.onrender.com/user/list/)
  -
  - Specific Users
  - API Route: `/user/list/?user_id=<user_id>` [↗️](https://pet-adoption-platform.onrender.com/user/list/?user_id=<user_id>)
- ### Pets
  - All Pets
  - API Route: `/pet/all/` [↗️](https://pet-adoption-platform.onrender.com/pet/all/)
  -
