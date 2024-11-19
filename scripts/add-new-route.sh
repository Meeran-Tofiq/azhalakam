#!/bin/bash

# Ensure script stops on errors
set -e

# Usage message
if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <resource_name> [--get-all]"
  echo "Example: $0 location --get-all"
  exit 1
fi

# Input resource name
resource_name="$1"
capitalized_name="$(echo "${resource_name:0:1}" | tr '[:lower:]' '[:upper:]')${resource_name:1}"
pluralized_name="${capitalized_name}s"
lower_pluralized="$(echo "$pluralized_name" | tr '[:upper:]' '[:lower:]')"

# Check if --get-all is passed as an argument
get_all=false
if [ "$#" -ge 2 ] && [ "$2" == "--get-all" ]; then
  get_all=true
fi

# Paths
paths_file="apps/api/src/common/Paths.ts"
index_file="apps/api/src/routes/index.ts"

# Check if Paths.ts exists
if [ ! -f "$paths_file" ]; then
  echo "Error: Paths.ts not found at $paths_file"
  exit 1
fi

# Check if index.ts exists
if [ ! -f "$index_file" ]; then
  echo "Error: index.ts not found at $index_file"
  exit 1
fi


# Step 1: Add to Paths.ts
if ! grep -q "$pluralized_name" "$paths_file"; then
  echo "Adding $pluralized_name to Paths.ts..."
  
  # Use a single-line, escaped string for new paths
  new_paths="\
	${pluralized_name}: {\
		Base: \"/$lower_pluralized\",\
		$(if $get_all; then echo "GetAll: \"/all\","; fi)\
		Create: \"/create\",\
		Get: \"/:${resource_name}Id\",\
		Update: \"/:${resource_name}Id/update\",\
		Delete: \"/:${resource_name}Id/delete\",\
	},"

  # Insert before the closing `} as const;`
  sed -i "/} as const;/i\\$new_paths" "$paths_file"
  echo "Updated Paths.ts."
else
  echo "$pluralized_name already exists in Paths.ts."
fi


# Step 2: Add to index.ts
if ! grep -q "${pluralized_name}Routes" "$index_file"; then
  echo "Adding $pluralized_name routes to index.ts..."
  import_line="import ${capitalized_name}Routes from \"./${capitalized_name}Routes\";"
  router_line="const ${resource_name}Router = Router();"
  
  # Conditional route_use to include getAll if --get-all is passed
  route_use="// ${capitalized_name} routes  \
$(if $get_all; then echo "${resource_name}Router.get(Paths.${pluralized_name}.GetAll, ${capitalized_name}Routes.getAll);\\"; fi)\
${resource_name}Router.post(Paths.${pluralized_name}.Create, ...${capitalized_name}Routes.create);\
${resource_name}Router.get(Paths.${pluralized_name}.Get, ${capitalized_name}Routes.getOne);\
${resource_name}Router.put(Paths.${pluralized_name}.Update, ...${capitalized_name}Routes.update);\
${resource_name}Router.delete(Paths.${pluralized_name}.Delete, ${capitalized_name}Routes.deleteOne);\
"
  router_registration="apiRouter.use(Paths.${pluralized_name}.Base, ${resource_name}Router);"

  # Add import line after other import statements
  sed -i "/import ProductRoutes/a\\$import_line" "$index_file"
  
  # Add router declaration after the "Init routers" section
  sed -i "/const productRouter = Router();/a\\$router_line" "$index_file"

  # Add route use block after the "Product routes" section with a comment header
  sed -i "/productRouter.delete(Paths.Products.Delete, ProductRoutes.deleteOne);/a\\\
  $route_use" "$index_file"

  # Add route use block after the "Add routes to apiRouter" section
  sed -i "/apiRouter.use(Paths.Products.Base, productRouter);/a\\$router_registration" "$index_file"

  echo "Updated index.ts."
else
  echo "${pluralized_name}Routes already exists in index.ts."
fi

echo "Done! Successfully added $pluralized_name routes."
