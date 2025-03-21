# PicMorph

PicMorph is a web application that allows users to upload images and convert them into different formats. The application is built using React (frontend) and Express.js with Sharp (backend) for efficient image processing.

## Features

- Upload images for conversion
- Select the desired output format (PNG, JPG, WebP, etc.)
- Display a progress bar during the upload process
- Show a loader while converting images
- Provide a download link for the converted image

## Tech Stack

### Frontend

- React (Vite)
- Axios (for API requests)
- TailwindCSS (for styling)

### Backend

- Express.js
- Multer (for handling file uploads)
- Sharp (for image conversion)
- CORS (for cross-origin requests)

## Installation

### Prerequisites

- Node.js (>=14)
- npm or yarn

### Clone the Repository

```sh
git clone https://github.com/yourusername/PicMorph.git
cd PicMorph
```

### Install Dependencies

#### Backend

```sh
cd backend
npm install
```

#### Frontend

```sh
cd frontend
npm install
```

## Running the Project

### Start Backend Server

```sh
cd backend
node server.js
```

Server runs on `http://localhost:3000`

### Start Frontend

```sh
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173`

## Usage

1. Open the frontend in your browser.
2. Upload an image file.
3. Select the desired format.
4. Click **Upload & Convert**.
5. Wait for the progress bar to complete.
6. Download the converted image once it's ready.

## Folder Structure

```
PicMorph/
├── backend/
│   ├── server.js
│   ├── uploads/ (temporary storage)
│   ├── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Upload.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   ├── package.json
│
├── README.md
```

## Contributing

Feel free to contribute by submitting issues or pull requests.

## License

MIT License

---

Happy Coding! 🚀
