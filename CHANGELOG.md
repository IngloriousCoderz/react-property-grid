# Changelog

## 0.6.0

- Use jsonpath-based selector for data retrieval
- Allow null values

### 0.6.1

- Update dependencies
- Fix event bubbling on nested sortable items

## 0.5.0

- Tooltips on property titles

### 0.5.1

- Title and description on array items

### 0.5.2

- Remove `react-redux-custom-store` as a dependency

## 0.4.0

- Apply flexbox and provide dragging item styling

### 0.4.1

- Scope all global styles into specific classes

### 0.4.2

- Fix CSS not being included in production bundle

### 0.4.3

- Prevent outer text-align to impact on grid

## 0.3.0

- Handle `allOf` properties

### 0.3.1

- Remove unwanted `console.log` statement

## 0.2.0

- Add a select to add an `anyOf` item
- Start using major versions for new features

### 0.2.1

- Refactor by removing duplication and useless divs

### 0.2.2

- Upgrade to latest versions of packages (such as React 15.4.1)

### 0.2.3

- Fix bug on array indexes shown as undefined

## 0.1.0

- Basic property grid, many features still missing.

### 0.1.1

- Fix library not being correctly published by ejecting from create-react-app

### 0.1.2

- Version bump to override first bugfix attempt

### 0.1.3

- Use jsonpath-lite, a fork made by me that removes dependencies from Node APIs

### 0.1.4

- Refactor automatic defaults generation logic
- Init grid with a custom action

### 0.1.5

- Use custom named store as a singleton for module
- Trigger onChange only upon user interaction

### 0.1.6

- Move store creation to constructor
- Fix onChange being triggered anyways

### 0.1.7

- Fix interaction with parent store and provide a working use case

### 0.1.8

- Handle the case of an `anyOf` at root of schema
