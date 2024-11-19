#!/bin/bash

# Check if the correct number of arguments are provided
if [ "$#" -ne 2 ]; then
  echo "Error: Incorrect number of arguments."
  echo "Usage: $0 <oldTerm> <newTerm>"
  exit 1
fi

# Get the terms from arguments
oldTerm=$1
newTerm=$2

echo "Starting the script..."
echo "Old term to replace: '$oldTerm'"
echo "New term to use: '$newTerm'"

# Find all files containing the old term (case-insensitive), excluding specific directories
echo "Searching for files containing '$oldTerm' or '${oldTerm^}'..."
files=$(find apps packages -type f \( -iname "*$oldTerm*" -o -iname "*${oldTerm^}*" \) | grep -vE "dist|prisma|node_modules")

# Check if any files were found
if [ -z "$files" ]; then
  echo "No files found containing '$oldTerm' or '${oldTerm^}'. Exiting."
  exit 0
fi

echo "Found files:"
echo "$files"

# Loop through the found files
for file in $files; do
  echo "Processing file: $file"
  
  # Get the directory path
  dir=$(dirname "$file")
  echo "File directory: $dir"

  # Get the filename and replace the old term with the new term (respecting case)
  new_file=$(basename "$file" | sed -E "s/${oldTerm^}/${newTerm^}/g; s/${oldTerm}/${newTerm}/g")
  echo "Original filename: $(basename "$file")"
  echo "New filename: $new_file"

  # Create the new file path
  new_path="$dir/$new_file"
  echo "New file path: $new_path"

  # Replace content in the file (respecting case) and write to the new file
  echo "Replacing content in the file..."
  sed -E "s/${oldTerm^}/${newTerm^}/g; s/${oldTerm}/${newTerm}/g" "$file" > "$new_path"

  echo "New file created: $new_path"

  # Open the new file in VS Code
  echo "Opening the new file in VS Code..."
  code "$new_path"

  echo "Finished processing $file"
done

echo "Script completed."
