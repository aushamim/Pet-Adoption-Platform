# Happy Tails (Back-End)

### API created using Django Rest Framework (DRF)

#

### Live Link: [HappyTails (Back-End)](https://pet-adoption-platform.onrender.com)

#

### Run the following command to start the project in development mode

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
  - API Route: `/user/list/?user_id=<user_id>` [↗️](https://pet-adoption-platform.onrender.com/user/list/?user_id=2)
  -
  - Update User Information
  - API Route (PUT Request): `/user/update/<user_id>/` [↗️](https://pet-adoption-platform.onrender.com/user/update/<user_id>/)
- ### Pets
  - All Pets
  - API Route: `/pet/all/` [↗️](https://pet-adoption-platform.onrender.com/pet/all/)
  -
  - All Pets of a Shelter
  - API Route: `/pet/all/?shelter_id=<shelter's_id>` [↗️](https://pet-adoption-platform.onrender.com/pet/all/?shelter_id=2)
  -
  - Specific Pet
  - API Route: `/pet/all/?pet_id=<pet_id>` [↗️](https://pet-adoption-platform.onrender.com/pet/all/?pet_id=1)
