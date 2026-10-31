# Portfolio CRUD (Laravel + Inertia.js + React)

Personal portfolio of Cris Gerwin Ulat. The **Projects** section is dynamic:
projects are stored in the database and managed through a CRUD feature.

## Requirements
PHP, Composer, Node.js, and npm.

## Setup
1. Clone the repository and open the folder:
   git clone https://github.com/crisgerwinulat21/portfolio-crud.git
   cd portfolio-crud
2. Install dependencies:
   composer install
   npm install
3. Create the environment file and app key:
   copy .env.example .env      (macOS/Linux: cp .env.example .env)
   php artisan key:generate
4. Create the database tables and sample projects:
   php artisan migrate
   php artisan db:seed --class=ProjectSeeder
   php artisan storage:link
5. Start the app:
   composer run dev
6. Open http://localhost:8000

## Managing projects
1. Go to /register and create an account.
2. Open /projects to add, edit, or delete projects.
3. The public portfolio page (/) shows the projects from the database.

## Tech
Laravel, Inertia.js, React, Tailwind CSS.