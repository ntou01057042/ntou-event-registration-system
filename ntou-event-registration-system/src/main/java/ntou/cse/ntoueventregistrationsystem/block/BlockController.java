package ntou.cse.ntoueventregistrationsystem.block;

import ntou.cse.ntoueventregistrationsystem.user.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blocks")
public class BlockController {
    private final BlockService service;

    @Autowired
    public BlockController(BlockService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Void> postBlock(@RequestBody Block block, @AuthenticationPrincipal CustomUserDetails userDetails) {
        block.setUserId(userDetails.getId());
        return service.createBlock(block) ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @GetMapping
    public List<Block> getAllBlocks(@AuthenticationPrincipal CustomUserDetails userDetails){
        return service.getAllBlocks(userDetails.getId());
    }
    @DeleteMapping
    public ResponseEntity<Void> deleteBlock(@RequestParam String targetId, @AuthenticationPrincipal CustomUserDetails userDetails){
        if(service.existsByUserIdAndTargetId(userDetails.getId(),targetId)){
            service.deleteBlock(userDetails.getId(),targetId);
            return ResponseEntity.ok().build();
        } else return ResponseEntity.noContent().build();
    }
}
