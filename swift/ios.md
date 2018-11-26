### Swift (iOS)

**Collisions**

```swift
// util.swift

struct CollisionCategory: OptionSet {
    let rawValue: Int
    static let cube = CollisionCategory(rawValue: 4)
    static let sphere = CollisionCategory(rawValue : 8)
}
```

```swift
// cube.swift
class Cube {

    init() {
      let node = SCNNode()

      node.physicsBody = SCNPhysicsBody(type: .static, shape: nil)

      node.physicsBody?.categoryBitMask = CollisionCategory.cube.rawValue
      node.physicsBody?.contactTestBitMask = CollisionCategory.sphere.rawValue
      node.physicsBody?.collisionBitMask = CollisionCategory.sphere.rawValue
    }

}
```

```swift
// Sphere.swift

class Sphere {
    init() {
      let node = SCNNode()

      node.physicsBody = SCNPhysicsBody(type: .static, shape: nil)

      node.physicsBody?.categoryBitMask = CollisionCategory.sphere.rawValue
      node.physicsBody?.contactTestBitMask = CollisionCategory.cube.rawValue
      node.physicsBody?.collisionBitMask = CollisionCategory.cube.rawValue
    }
}
```

```swift
// ARController.swift

class ARController: UIViewController, ARSCNViewDelegate, SCNPhysicsContactDelegate {
    override func viewDidLoad() {
        super.viewDidLoad()

        ...

        self.sceneView.scene.physicsWorld.contactDelegate = self
    }

    func physicsWorld(_ world: SCNPhysicsWorld, didBegin contact: SCNPhysicsContact) {
        print("Collision detected.");
    }
}

```
