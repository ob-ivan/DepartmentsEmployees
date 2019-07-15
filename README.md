Objective
---------
Given two models:

```
Department (name: string)
Employee (firstName: string, lastName: string, departmentId:number)
```

provide an interface with two tabs in left pane (one for each model) and an editing table for selected entity.

Installation
------------
You will need `npm` to install and run this project.

Clone the repo and `cd` to its folder. Then:

```
npm ci
./webpack
./init
./json-server
```

Now open `index.html` in a browser (`file:` protocol should be fine),
and it's there.
