let recipeHelper = {
    isJsonValid: function(json) {
        let response = {
            method: 'isJsonValid',
            status: 'error'
        }

        if(!json) {
            response.message = 'Json is mandatory'
            return response
        }

        let recipe = json[0]
        if(!recipe) {
            response.message = 'Json does not contain any recipes'
            return response
        }

        response.status = 'success'
        return response
    },
    isRecipeValid: function(recipe) {
        let response = {
            method: 'isRecipeValid',
            status: 'error'
        }
        if(!recipe) {
            response.message = 'Recipe is missing'
            return response
        }

        if(!recipe.name) {
            response.message = 'Name is missing'
            return response
        }

        if(!recipe.servings) {
            response.message = 'Servings is missing'
            return response
        }

        if(!recipe.ingredients || !recipe.ingredients.length) {
            response.message = 'Ingredients is missing'
            return response
        }
            
        for(let i = 0; i < recipe.ingredients.length; i++) {
            let ingredientValidation = this.isIngredientValid(recipe.ingredients[i])
            if(ingredientValidation.status === 'error') {
                response.message = `Recipe contains one or more invalid ingredients: ${ingredientValidation.message}`
                return response
            }
        }
    
        response.status = 'success'
        return response
    },
    isIngredientValid: function(ingredient) {
        let response = {
            method: 'isIngredientValid',
            status: 'error'
        }

        if(!ingredient.quantity) {
            response.message = 'Ingredient is missing quantity'
            return response
        }

        if(!ingredient.unit) {
            response.message = 'Ingredient is missing unit'
            return response
        }

        if(!ingredient.type) {
            response.message = 'Ingredient is missing type'
            return response
        }

        response.status = 'success'
        return response
    },
    getRecipeById: function (recipeRequest) {
        return new Promise((resolve, reject) => {
            if(!recipeRequest) {
                reject({
                    error: "Parameter 'recipeRequest' is mandatory"
                })
                return
            }
    
            let xhr = new XMLHttpRequest()
            xhr.open('GET', 'recipes.json', true)
    
            xhr.onload = function() {
                if(xhr.readyState === xhr.DONE) {
                    // 0 indicates a successful HTTP request in some browsers, but it's usually 200
                    if(xhr.status === 0 || xhr.status === 200) {
                        let recipes = JSON.parse(xhr.responseText)
                        let jsonValidation = recipeHelper.isJsonValid(recipes)
                        if(jsonValidation.status === 'error') {
                            reject(jsonValidation)
                            return
                        }
    
                        let recipe = recipes.find(r => r.id == recipeRequest.id)
                        resolve(recipe)
                        return
                    } else {
                        reject({
                            error: 'An error occurred'
                        })
                        return
                    }
                }
            }
            xhr.send()
        })
    }
}