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
  - Admin Panel [↗️](https://pet-adoption-platform.onrender.com/admin/)
  - ```shell
    username: admin
    password: admin
    ```
  -
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
  - API Route: `/user/list/<user_id>/` [↗️](https://pet-adoption-platform.onrender.com/user/list/2/)
  -
  - Update User Information
  - API Route (PUT Request): `/user/update/<user_id>/` [↗️](https://pet-adoption-platform.onrender.com/user/update/2/)
- ### Pets
  - All Pets
  - API Route: `/pet/all/` [↗️](https://pet-adoption-platform.onrender.com/pet/all/)
  -
  - All Pets of a Shelter
  - API Route: `/pet/all/?shelter_id=<shelter's_id>` [↗️](https://pet-adoption-platform.onrender.com/pet/all/?shelter_id=2)
  -
  - Specific Pet
  - API Route: `/pet/all/<pet_id>/` [↗️](https://pet-adoption-platform.onrender.com/pet/all/2/)
  -
  - Update Pet
  - API Route (PUT/PATCH Request): `/pet/update/<pet_id>/` [↗️](https://pet-adoption-platform.onrender.com/pet/update/2/)
  -
  - Delete Pet
  - API Route (DELETE Request): `/pet/delete/<pet_id>/` [↗️](https://pet-adoption-platform.onrender.com/pet/delete/2/)
- ### Adoptions
  - All Adoption Records
  - API Route: `/adoption/all/` [↗️](https://pet-adoption-platform.onrender.com/adoption/all/)
  -
  - All Adoption Records of a User
  - API Route: `/adoption/all/?applicant_id=<user_id>` [↗️](https://pet-adoption-platform.onrender.com/adoption/all/?applicant_id=2)
  -
  - All Adoption Records except a User
  - API Route: `/adoption/all/?not_applicant_id=<user_id>` [↗️](https://pet-adoption-platform.onrender.com/adoption/all/?not_applicant_id=2)
  -
  - Add a Record
  - API Route (POST request): `/adoption/request/` [↗️](https://pet-adoption-platform.onrender.com/adoption/request/)
  -
  - Update a Record
  - API Route (PATCH request): `/adoption/respond/<adoption_id>/` [↗️](https://pet-adoption-platform.onrender.com/adoption/respond/2/)
  -
  - Delete a Record
  - API Route (DELETE request): `/adoption/delete/<adoption_id>/` [↗️](https://pet-adoption-platform.onrender.com/adoption/delete/2/)
