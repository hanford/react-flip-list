import * as React from 'react'

const rFrame = requestAnimationFrame

/**
 * 
 * Detailed breakdown on FLIP technique
 * https://aerotwist.com/blog/flip-your-animations/
 * 
 * tl;dr
 * 
 * FLIP stands for First, Last, Invert, Play
 * 
 * This technique is relatively straightforward.. Knowing that there is a 100ms 
 * timeframe from when we change an elements position to the browser painting
 * the new position, we can do some trickery in that timeframe resulting in a clean
 * animation
 * 
 * First: We store where the element was
 * Last: We get the coordinates of where the element is moving to
 * Invert: Before the browser repaints the elements from old to new position, 
 * calculate the delta and apply transforms to the element so it's position is where 
 * the "first" step.
 * Play: The has rendered our element in a state where it appears to still be in the
 * "first" position, we remove the transform offsets, and the element will translate
 * to the "last" position.
 * 
 * By using transforms we should get dat 60fps HW accelerated animation, too! 🔥
 **/

interface Props {
  children: React.ReactElement<any>,
  animationTime: number
}
export default class List extends React.Component<Props> {
  nodeRefs = {}

  static defaultProps = {
    animationTime: 500
  }

  getSnapshotBeforeUpdate() {
    const { children } = this.props

    if (!Array.isArray(children)) {
      throw new Error('Children must be an array')
    }
    // when we update, let's measure every child
    // and store it, this will help us track
    // where an element was is before layout updates
    return children.map((child: React.ReactElement<any>) => {
      if (!child.key) {
        throw new Error('Children must have unique key property')
      }

      const ref = this.nodeRefs[child.key]

      if (!ref) return
  
      // this is the elements "FIRST" position
      const position = ref.getBoundingClientRect();
      
      return {
        ref,
        position
      };
    }).filter(Boolean);
  }

  componentDidUpdate(_prevProps: Props, _prevState: any, cachedData: Array<any>) {
    const { animationTime } = this.props

    if (!cachedData) return;

    cachedData.forEach(({ ref: node, position }) => {
      // get elements new position, even though the browser hasn't rendered it
      // this is the "LAST" position
      const nextPosition = node.getBoundingClientRect();

      // calculate deltas / if the node hasn't moved, both x/y will be 0
      const x = position.left - nextPosition.left;
      const y = position.top - nextPosition.top;

      // Animation frame so we force browser to paint with our flipped values
      // https://github.com/facebook/react/issues/2659#issuecomment-66165159
      rFrame(() => {
        // this is where our elements position has been inverted
        node.style.transform = `translate(${x}px, ${y}px)`;
        node.style.transition = "transform 0s";

        // Now that everything inverted, we can play the animation by removing
        // the transform and the element should go from "FIRST" to "LAST"
        rFrame(() => {
          node.style.transform = "";
          node.style.transition = `transform ${animationTime}ms`;
        });
      });
    });
  }

  getNode = (child: React.ReactElement<any>) => (ref: any) => {
    if (!child.key) {
      throw new Error('Children must have unique key')
    }
    // if we don't have a ref for this child yet, we'll need one.
    // let's also save it's current position
    if (ref && !this.nodeRefs[child.key]) {
      this.nodeRefs[child.key] = ref;
    }
  }

  render () {
    const { children } = this.props

    return React.Children.map(
      children,
      (child: React.ReactElement<any>) => child ? React.cloneElement(child, { ref: this.getNode(child) }) : null
    )
  }
}
