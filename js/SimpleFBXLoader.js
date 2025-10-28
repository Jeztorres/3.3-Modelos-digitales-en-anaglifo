import {
	FileLoader,
	Loader,
	LoaderUtils,
	Group,
	Mesh,
	BufferGeometry,
	Float32BufferAttribute,
	MeshPhongMaterial,
	BoxGeometry,
	Vector3
} from 'three';

class SimpleFBXLoader extends Loader {

	constructor( manager ) {
		super( manager );
	}

	load( url, onLoad, onProgress, onError ) {

		const scope = this;
		const loader = new FileLoader( scope.manager );
		
		loader.setPath( scope.path );
		loader.setResponseType( 'arraybuffer' );
		loader.setRequestHeader( scope.requestHeader );
		loader.setWithCredentials( scope.withCredentials );

		loader.load( url, function ( data ) {

			try {
				scope.parse( data, LoaderUtils.extractUrlBase( url ), onLoad );
			} catch ( e ) {
				if ( onError ) {
					onError( e );
				} else {
					console.error( e );
				}
				scope.manager.itemError( url );
			}

		}, onProgress, onError );

	}

	parse( data, path, onLoad ) {

		// Crear un modelo placeholder mientras cargamos el FBX real
		console.log( 'SimpleFBXLoader: Creando modelo placeholder para Ch15' );
		
		const group = new Group();
		group.name = 'Ch15_Model';

		// Crear una figura humanoide básica como placeholder
		// Torso
		const torsoGeometry = new BoxGeometry( 0.6, 1.2, 0.3 );
		const torsoMaterial = new MeshPhongMaterial( { color: 0x8B4513 } );
		const torso = new Mesh( torsoGeometry, torsoMaterial );
		torso.position.y = 0.6;
		group.add( torso );

		// Cabeza
		const headGeometry = new BoxGeometry( 0.4, 0.4, 0.4 );
		const headMaterial = new MeshPhongMaterial( { color: 0xFFDBB5 } );
		const head = new Mesh( headGeometry, headMaterial );
		head.position.y = 1.4;
		group.add( head );

		// Brazos
		const armGeometry = new BoxGeometry( 0.2, 0.8, 0.2 );
		const armMaterial = new MeshPhongMaterial( { color: 0xFFDBB5 } );
		
		const leftArm = new Mesh( armGeometry, armMaterial );
		leftArm.position.set( -0.5, 0.6, 0 );
		group.add( leftArm );

		const rightArm = new Mesh( armGeometry, armMaterial );
		rightArm.position.set( 0.5, 0.6, 0 );
		group.add( rightArm );

		// Piernas
		const legGeometry = new BoxGeometry( 0.25, 1.0, 0.25 );
		const legMaterial = new MeshPhongMaterial( { color: 0x000080 } );
		
		const leftLeg = new Mesh( legGeometry, legMaterial );
		leftLeg.position.set( -0.2, -0.5, 0 );
		group.add( leftLeg );

		const rightLeg = new Mesh( legGeometry, legMaterial );
		rightLeg.position.set( 0.2, -0.5, 0 );
		group.add( rightLeg );

		console.log( 'SimpleFBXLoader: Modelo placeholder Ch15 creado exitosamente' );
		
		// Llamar al callback con el modelo
		if ( onLoad ) {
			onLoad( group );
		}

	}

}

export { SimpleFBXLoader };