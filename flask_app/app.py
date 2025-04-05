from flask import Flask, request, jsonify, send_file
import subprocess
import os

app = Flask(__name__)

# Route to handle rendering
@app.route('/render', methods=['POST'])
def render_latex():
    try:
        # Extract LaTeX/Asymptote code from the request
        data = request.json
        latex_code = data.get('code')

        if not latex_code:
            return jsonify({'error': 'No code provided'}), 400

        # Save the code to a temporary .tex file
        tex_file = 'temp.tex'
        with open(tex_file, 'w') as f:
            f.write(latex_code)

        # Render the .tex file into a PDF
        subprocess.run(['pdflatex', '-interaction=nonstopmode', tex_file], check=True)

        # Return the rendered PDF file
        pdf_file = 'temp.pdf'
        if os.path.exists(pdf_file):
            return send_file(pdf_file, as_attachment=True)
        else:
            return jsonify({'error': 'Rendering failed'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        # Clean up temporary files
        for temp_file in ['temp.tex', 'temp.pdf', 'temp.log', 'temp.aux']:
            if os.path.exists(temp_file):
                os.remove(temp_file)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
