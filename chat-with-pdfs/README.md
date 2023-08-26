# DocTalker

## Introduction

**DocTalker** is a Streamlit-powered application that allows users to interact with the contents of their PDF documents. It processes the text of your PDFs, embeds the content in a vector space, and enables a chat interface to retrieve relevant content based on user questions.

## Features

- **Upload PDFs**: Ability to upload multiple PDF files simultaneously.
- **Conversational Retrieval**: Interact with the content of your PDFs through a chat interface.
- **Vector-based Search**: Utilizes embeddings from HuggingFace InstructEmbeddings and OpenAI to efficiently retrieve relevant content.
- **In-app Text Processing**: Extracts and processes text from PDF files to generate chunks for vector embeddings.

## Installation & Setup

### Prerequisites

- Python 3.6 or higher
- Virtual environment tool (e.g., `virtualenv`)

### Setting Up

1. **Clone the repository**:

```
   git clone <repository_url>
   cd <repository_directory>
```

2. **Create a virtual environment**:

```
   virtualenv myenv
```

3. **Activate the virtual environment**:

- On macOS and Linux:
  ```
  source myenv/bin/activate
  ```
- On Windows:
  ```
  .\myenv\Scripts\activate
  ```

4. **Install the required dependencies**:
   ```
   pip install -r requirements.txt
   ```

### Running the Application

To launch the application, run:

```
streamlit run app.py
```

## Usage

1. Launch the application.
2. Using the sidebar, upload your desired PDF documents.
3. Click the "Process" button.
4. Once the documents are processed, ask questions related to your documents in the main text input box.
5. View the conversational interactions between you and the chatbot for content retrievals.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

Please check the license file in the repository for more details.
