const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: null,
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			login: async (email, password) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ email, password }),
					});
			
					const data = await response.json();
			
					if (response.ok) {
						sessionStorage.setItem('token', data.token);
						setStore({ token: data.token });
						return { success: true };
					} else {
						return { success: false, msg: data.msg };
					}
				} catch (error) {
					console.error('Error:', error);
					return { success: false, msg: 'An error occurred. Please try again later.' };
				}
			},
			
			logout: () => {
				sessionStorage.removeItem('token');
				setStore({ token: null });
			},
			
			checkAuth: () => {
				const token = sessionStorage.getItem('token');
				if (token) {
					setStore({ token });
				}
			},
			signup: async (email, password) => {
				try {
					console.log("Attempting signup...");
					const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
						method: 'POST',
						headers: { 
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ email, password }),
					});
			
					console.log("Response status:", response.status);
					const data = await response.json();
					console.log("Response data:", data);
			
					if (!response.ok) {
						throw new Error(data.msg || `HTTP error! status: ${response.status}`);
					}
			
					return { success: true, data };
				} catch (error) {
					console.error('Signup error:', error);
					return { success: false, msg: error.message || 'An error occurred. Please try again later.' };
				}
			}
		}
	}
};

export default getState;
