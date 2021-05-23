// do all event handler bindings in the onload handler so we know that the elements have actually been loaded into the DOM
window.onload = () => {
    // store in variables to tidy up code
    let recipeIdElement = htmlHelper.getElementById('recipeId')
    if(!recipeIdElement) return

    let quantityElement = htmlHelper.getElementById('quantity')
    if(!quantityElement) return
    quantityElement.value = 4

    let getRecipeButton = htmlHelper.getElementById('getRecipe')
    if(!getRecipeButton) {
        console.error('Get recipe button is mandatory')
        return
    }

    // define the onclick handler inline since we don't need to call it from anywhere else
    getRecipeButton.onclick = () => {
        htmlHelper.setHtmlById('ingredients', '')
        htmlHelper.addClassById('ingredients', 'hide')

        htmlHelper.setHtmlById('steps', '')
        htmlHelper.addClassById('steps', 'hide')

        htmlHelper.setHtmlById('error', '')
        htmlHelper.addClassById('error', 'hide')

        const recipeId = recipeIdElement.value
        if(!recipeId) {
            showError({
                method: 'button click handler',
                status: 'error',
                message: 'No recipe is selected. Unable to get recipe'
            })
            return
        }

        const quantity = quantityElement.value
        if(!quantity) {
            showError({
                method: 'button click handler',
                status: 'error',
                message: 'No quantity was provided. Unable to get recipe'
            })
            return
        }

        if(isNaN(quantity)) {
            showError({
                method: 'button click handler',
                status: 'error',
                message: 'Provided quantity was not a number. Unable to get recipe'
            })
            return
        }

        recipeHelper.getRecipeById({
            id: recipeId,
            quantity: quantity
        }).then(recipe => {
            let recipeValidation = recipeHelper.isRecipeValid(recipe)
            if(recipeValidation.status === 'error') {
                showError(recipeValidation)
                return
            }
        
            if(!htmlHelper.setHtmlById('title', recipe.name)) showError('Unable to set title')
            if(!htmlHelper.setHtmlById('servings', recipe.servings)) showError('Unable to set servings')

            let factor = quantity / recipe.servings
    
            recipe.ingredients.forEach(ingredient => {
                let listElement = document.createElement('li')
                listElement.innerHTML = `${ingredient.quantity * factor} ${ingredient.unit} ${ingredient.type}`
    
                let ingredientsElement = htmlHelper.getElementById('ingredients')
                ingredientsElement.appendChild(listElement)
                ingredientsElement.classList.remove('hide')
            })
    
            recipe.steps.forEach(step => {
                let listElement = document.createElement('li')
                listElement.innerHTML = step
                
                let stepsElement = htmlHelper.getElementById('steps')
                stepsElement.appendChild(listElement)
                stepsElement.classList.remove('hide')
            })
        })
        .catch(error => showError(error))
    }
}

function showError(error) {
    htmlHelper.setHtmlById('error', error.message)
    htmlHelper.removeClassById('error', 'hide')
    console.error(error.message)
}